import * as core from "@actions/core";
import * as tc from "@actions/tool-cache";
import fs from "fs";
import path from "path";
import os from "os";

export async function getGenesyscloudArchy(
	version: string,
	osPlatform: string = os.arch()
) {
	const platform = mapOS(osPlatform);

	let toolPath: string;
	toolPath = tc.find("genesyscloud-archy", version);

	if (toolPath) {
		core.info(`Found in cache @ ${toolPath}`);
	} else {
		core.info(`Attempting to download ${version}...`);
		let downloadPath = "";

		const downloadUrl = `https://sdk-cdn.mypurecloud.com/archy/${version}/archy-${platform}.zip`;

		core.debug(`Downloading from URL ${downloadUrl}`);

		downloadPath = await tc.downloadTool(downloadUrl);

		core.info("Extracting...");
		const extPath = await tc.extractZip(downloadPath);

		fs.renameSync(
			path.join(
				extPath,
				`archyBin/archy-${platform}-${version}${
					platform == "win" ? ".exe" : ""
				}`
			),
			path.join(extPath, `archy${platform == "win" ? ".exe" : ""}`)
		);

		core.info("Adding to the cache...");

		toolPath = await tc.cacheDir(extPath, "genesyscloud-archy", version);
	}

	core.addPath(toolPath);
}

function mapOS(os: string) {
	const mappings = {
		win32: "win",
		darwin: "macos",
	};

	return mappings?.[os as keyof typeof mappings] || os;
}
