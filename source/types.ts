export type IconData = {
	title: string;
	slug: string;
	hex: string;
	aliases?: {
		aka?: string[];
		dup?: Array<{title: string; hex?: string; guidelines?: string}>;
		loc?: Record<string, string>;
	};
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
