import * as core from "@actions/core";
import * as hc from "@actions/http-client";
import * as io from "@actions/io";
import * as tc from "@actions/tool-cache";
import * as semver from "semver";
import path from "path";
import os from "os";

interface IArchyVersion {
	version: string;
}

export async function getGenesyscloudArchy(
	version: string,
	osPlatform: string = os.arch()
) {
	const genesyscloudArchyVersions = await getVersions();

	if (isLatestSyntax(version)) {
		version = genesyscloudArchyVersions[0].version;
		core.info("Getting latest genesyscloud archy version...");
	} else {
		if (
			genesyscloudArchyVersions.filter((value) => value.version == version)
				.length == 0
		) {
			throw new Error(`Unable to find genesyscloud archy version ${version}`);
		}
	}

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

		core.info("Moving extracted binary...");
		await io.mv(
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

export async function getVersions(): Promise<IArchyVersion[]> {
	const dataUrl = "https://sdk-cdn.mypurecloud.com/archy/versions.json";
	const httpClient = new hc.HttpClient("setup-genesyscloud-archy", [], {
		allowRetries: true,
		maxRetries: 3,
	});
	const response = await httpClient.getJson<IArchyVersion[]>(dataUrl);
	let versions: IArchyVersion[] = [];
	if (response.result) {
		versions = response.result;
		versions.sort((v1, v2) => semver.rcompare(v1.version, v2.version));
	}
	return versions;
}

function mapOS(os: string): string {
	const mappings = {
		win32: "win",
		darwin: "macos",
	};

	return mappings?.[os as keyof typeof mappings] || os;
}

function isLatestSyntax(versionSpec: string): boolean {
	return ["current", "latest"].includes(versionSpec);
}
