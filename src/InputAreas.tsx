import { Button, ButtonGroup, Form, FormControl, InputGroup } from "react-bootstrap";
import FormGroup from "./FormGroup";
import { useState } from "react";
import { kindOptions } from "./helper";

type dataType = {
	month: number;
	day: number;
	cashOrBank: string;
	kind: string;
	content: string;
	amount: number;
};

const DateInput = (props: { values: { month: number; day: number }; onChange: (values: { month: number; day: number }) => void }) => {
	const [date, setDate] = useState(new Date());
	const [month, setMonth] = useState(date.getMonth() + 1);
	const [day, setDay] = useState(date.getDate());

	const changeDate = (dateToChange: Date) => {
		setMonth(dateToChange.getMonth() + 1);
		setDay(dateToChange.getDate());
		changeButtonState(dateToChange);
		props.onChange({ month: dateToChange.getMonth() + 1, day: dateToChange.getDate() });
	};

	const dateUp = () => {
		const changedDate = new Date(date.getTime() + 1000 * 60 * 60 * 24);
		setDate(changedDate);
		changeDate(changedDate);
	};

	const dateDown = () => {
		const changedDate = new Date(date.getTime() - 1000 * 60 * 60 * 24);
		setDate(changedDate);
		changeDate(changedDate);
	};

	const changeDayBeforeYesterday = () => {
		const changedDate = new Date();
		changedDate.setDate(changedDate.getDate() - 2);
		setDate(changedDate);
		changeDate(changedDate);
	};

	const changeYesterday = () => {
		const changedDate = new Date();
		changedDate.setDate(changedDate.getDate() - 1);
		setDate(changedDate);
		changeDate(changedDate);
	};

	const changeToday = () => {
		const changedDate = new Date();
		setDate(changedDate);
		changeDate(changedDate);
	};

	const [todayBtnState, setTodayBtnState] = useState("primary");
	const [yesterdayBtnState, setYesterdayBtnState] = useState("outline-primary");
	const [beforeYesterdayBtnState, setBeforeYesterdayBtnState] = useState("outline-primary");

	const changeButtonState = (date: Date) => {
		const today = new Date();
		const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
		const dayBeforeYesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2);
		const changedMonth = date.getMonth();
		const changedDay = date.getDate();
		const buttonDates = [today, yesterday, dayBeforeYesterday];
		const funcs = [setTodayBtnState, setYesterdayBtnState, setBeforeYesterdayBtnState];
		buttonDates.forEach((value, index) => {
			const buttonMonth = value.getMonth();
			const buttonDay = value.getDate();
			if (changedMonth == buttonMonth && changedDay == buttonDay) {
				funcs[index]("primary");
			} else {
				funcs[index]("outline-primary");
			}
		});
	};

	return (
		<FormGroup>
			<Form.Label>??????</Form.Label>
			<InputGroup>
				<FormControl type="tel" value={month} onChange={() => {}}></FormControl>
				<InputGroup.Text>???</InputGroup.Text>
				<FormControl type="tel" value={day} onChange={() => {}}></FormControl>
				<InputGroup.Text>???</InputGroup.Text>
				<ButtonGroup vertical>
					<Button id="day-up" variant="secondary" onClick={dateUp}>
						???
					</Button>
					<Button id="day-down" variant="secondary" onClick={dateDown}>
						???
					</Button>
				</ButtonGroup>
			</InputGroup>
			<ButtonGroup className="w-100 mt-3">
				<Button id="day-before-yesterday" variant={beforeYesterdayBtnState} onClick={changeDayBeforeYesterday}>
					?????????
				</Button>
				<Button id="yesterday" variant={yesterdayBtnState} onClick={changeYesterday}>
					??????
				</Button>
				<Button id="today" variant={todayBtnState} onClick={changeToday}>
					??????
				</Button>
			</ButtonGroup>
		</FormGroup>
	);
};

const CashBankInput = (props: { value: string; onChange: (value: string) => void }) => {
	return (
		<FormGroup>
			<p className="m-0">???????????????????????????</p>
			<ButtonGroup className="mt-3 w-100">
				<input id="cash" className="btn-check" type="radio" name="cash-or-bank-radio" value="??????" defaultChecked onClick={(e) => props.onChange(e.currentTarget.value)} />
				<label htmlFor="cash" className="btn btn-outline-primary w-50">
					??????
				</label>
				<input id="bank" className="btn-check" type="radio" name="cash-or-bank-radio" value="??????????????????" onClick={(e) => props.onChange(e.currentTarget.value)} />
				<label htmlFor="bank" className="btn btn-outline-primary w-50">
					??????????????????
				</label>
			</ButtonGroup>
		</FormGroup>
	);
};

const KindInput = (props: { value: string; kindOnChange: (value: string) => void }) => {
	const optionElems: JSX.IntrinsicElements["option"][] = [];
	kindOptions.forEach((option, index) => {
		optionElems.push(
			<option value={option} key={index + 1}>
				{option}
			</option>
		);
	});

	return (
		<FormGroup>
			<Form.Label>??????</Form.Label>
			<Form.Select
				value={props.value}
				onChange={(e) => {
					const currentVal = e.currentTarget.value;
					props.kindOnChange(currentVal);
				}}
			>
				<option disabled value={""}>
					????????????????????????
				</option>
				{optionElems}
			</Form.Select>
		</FormGroup>
	);
};

const ContentInput = (props: { value: string; contentOnChange: (value: string) => void }) => {
	return (
		<FormGroup>
			<Form.Label>??????</Form.Label>
			<Form.Control
				value={props.value}
				onChange={(e) => {
					const currentVal = e.currentTarget.value;
					props.contentOnChange(currentVal);
				}}
			></Form.Control>
		</FormGroup>
	);
};

const AmountInput = (props: { value: string; amountOnChange: (value: string) => void }) => {
	return (
		<FormGroup>
			<Form.Label>??????</Form.Label>
			<InputGroup>
				<Form.Control
					type="tel"
					value={props.value}
					onChange={(e) => {
						const currentVal = Number(e.currentTarget.value);
						if (isNaN(currentVal) || currentVal <= 0) {
							props.amountOnChange("");
							return;
						}
						props.amountOnChange(currentVal.toString());
					}}
				/>
				<InputGroup.Text>???</InputGroup.Text>
			</InputGroup>
		</FormGroup>
	);
};

export { DateInput, CashBankInput, KindInput, ContentInput, AmountInput };
