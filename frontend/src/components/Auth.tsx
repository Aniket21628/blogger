import { useState } from "react";
import { SignupType } from "@aniket_p/medium-blog";
import axios from "axios";
import { BACKEND_URL } from "../config";
import TitleAuth from "./AuthHeader";
import LabelInput from "./LabelInput";
import { toast, Toaster } from "sonner";
import { ImSpinner2 } from "react-icons/im"; // spinner icon

export default function Auth({ type }: { type: "signup" | "signin" }) {
	const [postInputs, setPostInputs] = useState<SignupType>({
		name: "",
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);

	async function sendRequest() {
		setLoading(true);
		try {
			const res = await axios.post(
				`${BACKEND_URL}/api/v1/user/${
					type === "signin" ? "signin" : "signup"
				}`,
				postInputs
			);

			const jwt = res.data.jwt;
			localStorage.setItem("token", jwt);
			if (res.status === 200) {
				const successMessage =
					type === "signin"
						? "Login Successful"
						: "Signup Successful";
				toast.success(successMessage);
				setTimeout(() => {
					window.location.reload();
				}, 1000);
			}
		} catch (error: any) {
			console.warn(error);
			const errorMessage =
				error.response?.data?.message ?? "Invalid Inputs";
			toast.warning(errorMessage, {
				duration: 2000,
			});
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<TitleAuth type={type} />

			<div className="grid gap-3 pt-10 w-80">
				{type === "signin" ? null : (
					<LabelInput
						label="Name"
						type="text"
						placeholder="Name"
						onChange={(e) => {
							setPostInputs({
								...postInputs,
								name: e.target.value,
							});
						}}
					/>
				)}
				<LabelInput
					label="Email"
					type="text"
					placeholder="Email"
					onChange={(e) => {
						setPostInputs({
							...postInputs,
							email: e.target.value,
						});
					}}
				/>
				<LabelInput
					label="Password"
					type="password"
					placeholder="Password"
					onChange={(e) => {
						setPostInputs({
							...postInputs,
							password: e.target.value,
						});
					}}
				/>
				<button
					type="button"
					onClick={sendRequest}
					disabled={loading}
					className={`mt-5 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 flex items-center justify-center gap-2 transition-all
						${loading ? "opacity-70 cursor-not-allowed" : ""}`}>
					{loading ? (
						<>
							<ImSpinner2 className="animate-spin text-lg" />
							{type === "signin" ? "Signing In..." : "Signing Up..."}
						</>
					) : (
						<>{type === "signin" ? "Sign In" : "Sign Up"}</>
					)}
				</button>
			</div>

			<Toaster closeButton position="top-right" duration={1200} />
		</div>
	);
}
