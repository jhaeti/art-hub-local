"use client";

import { ERROR } from "@/app/context/MsgContext";
import useMsgContext from "@/app/hooks/useMsgContext";
import apiUrl from "@/app/utils/apiUrl";
import { useRouter } from "next/navigation";

const ApproveArtBtn = ({ art }) => {
	const router = useRouter();
	const { dispatch } = useMsgContext();
	async function handleClick() {
		const res = await fetch(
			apiUrl + "/products/verify/" + String(art._id),
			{
				method: "PUT",
				credentials: "include",
			}
		);
		if (res.ok) {
			router.back();
			router.refresh();
		} else {
			dispatch({ type: ERROR, payload: "Something went wrong." });
		}
	}
	return <button onClick={handleClick}>Verify Art</button>;
};

export default ApproveArtBtn;
