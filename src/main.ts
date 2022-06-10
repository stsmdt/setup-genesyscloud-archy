import * as core from "@actions/core";
import os from "os";
import { getGenesyscloudArchy } from "./installer";

export async function run(): Promise<void> {
	try {
		// Gater GitHub Actions inputs
		const version: string = core.getInput("archy-version");

		// Gather OS details
		const osPlatform = os.platform();

		getGenesyscloudArchy(version, osPlatform);
	} catch (error) {
		if (error instanceof Error) {
			core.setFailed(error.message);
		}
	}
}
