import React, { useEffect, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import $ from "jquery";
import { kindOptions, notCorsUrl } from "./helper";

type addedDataType = {
	date: string;
	way: string;
	kind: string;
	content: string;
	amount: string;
	id: string;
};

const AddedValues = (props: { addedData: string[]; onClick: () => void }) => {
	const dataDict = {
		date: props.addedData[0],
		way: props.addedData[1],
		kind: props.addedData[2],
		content: props.addedData[3],
		amount: props.addedData[4],
		id: props.addedData[5],
	};
	const [formClass, setFormClass] = useState("added-value border rounded-3 p-3 my-3");
	const [kindValue, setKindValue] = useState("");
	// 種別の初期値を設定する
	useEffect(() => {
		// 金額がプラスなら種別を「収入」に設定する
		if (Number(dataDict.amount) > 0) setKindValue("収入");
	}, [dataDict.amount]);
	const [contentValue, setContentValue] = useState("");

	const optionElems: JSX.IntrinsicElements["option"][] = [];
	kindOptions.forEach((option, index) => {
		optionElems.push(
			<option value={option} key={index + 1}>
				{option}
			</option>
		);
	});

	/**「自動追加」に送信 */
	const sendSubForm = () => {
		const subFormData = {
			"entry.143907117": dataDict.date,
			"entry.404340766": dataDict.way,
			"entry.1171936216": dataDict.kind,
			"entry.1297137810": dataDict.content,
			"entry.321306606": dataDict.amount,
			"entry.2061631037": dataDict.id,
		};
		$.ajax({
			url: notCorsUrl + "https://docs.google.com/forms/u/0/d/e/1FAIpQLSeN_YxlXOgLL9LKzEjG-NuTAQy7BPTBglSWZw5afw1x-V0uZQ/formResponse",
			method: "post",
			data: subFormData,
		});
	};

	/**お小遣い帳に送信 */
	const sendMainForm = () => {
		const mainFormData = {
			"entry.143907117": dataDict.date,
			"entry.404340766": dataDict.way,
			"entry.1171936216": kindValue,
			"entry.1297137810": contentValue,
			"entry.321306606": dataDict.amount,
		};
		$.ajax({
			url: notCorsUrl + "https://docs.google.com/forms/u/0/d/e/1FAIpQLScW_qpNvlhLDsAMQX4TPvZdviPPj4LcIN0xGVB9Gzt5op5Uaw/formResponse",
			method: "post",
			data: mainFormData,
		});
	};

	// 自動で入力
	useEffect(() => {
		/**入力するデータ */
		const data = { kind: "", content: "" };
		// 楽天ラッキーくじ
		if (dataDict.way == "楽天ポイント" && dataDict.content.includes("くじ") && Number(dataDict.amount) > 0) {
			data.kind = "収入";
			data.content = "楽天ラッキーくじ";
		}
		// モバイルSuica
		if (dataDict.content.includes("ﾓﾊﾞｲﾙｽｲｶ") && Number(dataDict.amount) < 0) {
			data.kind = "交通費";
			data.content = "モバイルSuicaチャージ";
		}
		// 実際に入力する
		setKindValue(data.kind)
		setContentValue(data.content)
	}, [dataDict.amount]);

	/**送信ボタンをクリックした時の動作 */
	const buttonOnClick = () => {
		if (kindValue == "" || contentValue == "") {
			return;
		}
		setFormClass("d-none");
		props.onClick();
		sendSubForm();
		sendMainForm();
	};

	return (
		<Form className={formClass}>
			<p>
				{dataDict.date} {dataDict.way}（{dataDict.amount}円）
			</p>
			<Form.Select
				className="mb-3"
				value={kindValue}
				onChange={(e) => {
					const currentVal = e.currentTarget.value;
					setKindValue(currentVal);
				}}
			>
				<option disabled value={""}>
					選択してください
				</option>
				{optionElems}
			</Form.Select>
			<FormControl
				className="mb-3"
				placeholder={dataDict.content}
				value={contentValue}
				onChange={(e) => {
					setContentValue(e.currentTarget.value);
				}}
			/>
			<Button onClick={buttonOnClick}>送信</Button>
		</Form>
	);
};

export default AddedValues;
