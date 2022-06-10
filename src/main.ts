import * as core from "@actions/core";
import os from "os";

export async function run(): Promise<void> {
	try {
		const version: string = core.getInput("archy-version");
		const arch = os.arch();
	} catch (error) {
		if (error instanceof Error) {
			core.setFailed(error.message);
		}
	}
}
