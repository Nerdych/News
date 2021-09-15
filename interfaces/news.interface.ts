export interface News {
	description?: {
		_text: string;
	};
	enclosure?: {
		_attributes: {
			url: string;
		};
	};
	source: string;
	link: {
		_text: string;
	};
	pubDate: {
		_text: Date;
	};
	title: {
		_text: string;
	};
}
