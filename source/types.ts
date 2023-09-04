export type IconData = {
	title: string;
	slug: string;
	hex: string;
};

export type IconJson = {
	icons: IconData[];
};

export type JsDelivrNpmResponse = {
	type: string;
	name: string;
	tags: Record<string, string>;
	versions: Array<{
		version: string;
		links: Record<string, string>;
	}>;
	links: Record<string, string>;
};
