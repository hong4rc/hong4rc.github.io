interface UTMParams {
	source?: string;
	medium?: string;
	campaign?: string;
	content?: string;
}

const defaultUTM: UTMParams = {
	source: 'hong4rc',
	medium: 'portfolio',
	campaign: 'website'
};

export function addUTM(url: string, params: UTMParams = {}): string {
	try {
		const urlObj = new URL(url);
		const utm = { ...defaultUTM, ...params };

		if (utm.source) urlObj.searchParams.set('utm_source', utm.source);
		if (utm.medium) urlObj.searchParams.set('utm_medium', utm.medium);
		if (utm.campaign) urlObj.searchParams.set('utm_campaign', utm.campaign);
		if (utm.content) urlObj.searchParams.set('utm_content', utm.content);

		return urlObj.toString();
	} catch {
		return url;
	}
}
