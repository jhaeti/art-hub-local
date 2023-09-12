"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Unstable_NumberInput as NumberInput } from "@mui/base/Unstable_NumberInput";
import { styled } from "@mui/system";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import { ERROR } from "@/app/context/MsgContext";
import useMsgContext from "@/app/hooks/useMsgContext";
import apiUrl from "@/app/utils/apiUrl";
import { useRouter } from "next/navigation";

const BuyArtBtn = ({ art }) => {
	const [open, setOpen] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const router = useRouter();
	const { dispatch } = useMsgContext();
	async function handleClick() {
		const body = {
			seller: art.seller,
			productId: art._id,
			productName: art.name,
			price: art.price,
			quantity,
		};
		body.amount = body.price * body.quantity;
		const res = await fetch(apiUrl + "/products/order", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});
		res.ok
			? router.push("/profile/orders")
			: dispatch({ type: ERROR, payload: "Login to buy an item" });

		setOpen(false);
	}

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		pt: 2,
		px: 4,
		pb: 3,
	};
	const handleOpen = () => {
		setOpen(true);
	};

	// Quantity Input
	const CustomNumberInput = React.forwardRef(function CustomNumberInput(
		props,
		ref
	) {
		return (
			<NumberInput
				slots={{
					root: StyledInputRoot,
					input: StyledInput,
					incrementButton: StyledButton,
					decrementButton: StyledButton,
				}}
				slotProps={{
					incrementButton: {
						children: <AddIcon />,
						className: "increment",
					},
					decrementButton: {
						children: <RemoveIcon />,
					},
				}}
				{...props}
				ref={ref}
			/>
		);
	});

	function QuantityInput() {
		return (
			<CustomNumberInput
				value={quantity}
				onChange={(event, val) => setQuantity(val)}
				aria-label="Quantity Input"
				min={1}
				max={+art.quantity}
			/>
		);
	}

	const blue = {
		100: "#daecff",
		200: "#b6daff",
		300: "#66b2ff",
		400: "#3399ff",
		500: "#007fff",
		600: "#0072e5",
		800: "#004c99",
	};

	const grey = {
		50: "#f6f8fa",
		100: "#eaeef2",
		200: "#d0d7de",
		300: "#afb8c1",
		400: "#8c959f",
		500: "#6e7781",
		600: "#57606a",
		700: "#424a53",
		800: "#32383f",
		900: "#24292f",
	};

	const StyledInputRoot = styled("div")(
		({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
    margin-top: 2rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`
	);

	const StyledInput = styled("input")(
		({ theme }) => `
  font-size: 1.6rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.375;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  border-radius: 4px;
  margin: 0 2rem;
  padding: 10px 12px;
  outline: 0;
  min-width: 0;
  width: 4rem;
  text-align: center;

  &:hover {
    border-color: var(--color-primary);
  }

  &:focus {
    border-color: var(--color-primary);
  }

  &:focus-visible {
    outline: 0;
  }
`
	);

	const StyledButton = styled("button")(
		({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 0;
  border-radius: 999px;
  color: var(--color-dark);
  background: ;
  width: 40px;
  height: 40px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: var(--color-gray);
    cursor: pointer;
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`
	);
	return (
		<>
			<button onClick={handleOpen}>Buy art</button>
			<Modal
				open={open}
				onClose={() => setOpen(false)}
				aria-labelledby="parent-modal-title"
				aria-describedby="parent-modal-description"
			>
				<Box
					style={{
						display: "flex",
						alignItems: "center",
						flexDirection: "column",
					}}
					sx={{ ...style, width: 400 }}
				>
					<h2 id="parent-modal-description">
						Number of arts to buy.
					</h2>
					<QuantityInput />
					<Button
						style={{
							width: "100%",
							fontSize: "1.6rem",
							marginTop: "2rem",
							padding: "1.6rem",
						}}
						variant="contained"
						onClick={handleClick}
						color="success"
					>
						Make payment
					</Button>
				</Box>
			</Modal>
		</>
	);
};

export default BuyArtBtn;
