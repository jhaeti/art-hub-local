"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ThemeProvider } from "@mui/material";

import muiTheme from "../utils/muiTheme";
import { UserContextProvider } from "./UserContext";
import { MsgContextProvider } from "./MsgContext";

const Provider = ({ children }) => {
	return (
		<ThemeProvider theme={muiTheme}>
			<MsgContextProvider>
				<UserContextProvider>
					<ProgressBar
						height="4px"
						color="#00ff00"
						options={{ showSpinner: false }}
						shallowRouting
					/>
					{children}
				</UserContextProvider>
			</MsgContextProvider>
		</ThemeProvider>
	);
};

export default Provider;
