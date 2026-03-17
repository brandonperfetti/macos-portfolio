const SEARCH_ENGINE_URL = 'https://duckduckgo.com/?q=';

const URL_INPUT_PATTERN =
	/^(https?:\/\/)?((localhost(?::\d+)?)|([a-z0-9-]+(?:\.[a-z0-9-]+)+))(?:[/?#]\S*)?$/i;

const hasHttpProtocol = (value: string): boolean =>
	value.startsWith('http://') || value.startsWith('https://');

const withDefaultProtocol = (value: string): string => {
	if (hasHttpProtocol(value)) return value;
	if (value.startsWith('localhost')) return `http://${value}`;
	return `https://${value}`;
};

/**
 * Resolves a Safari-style address bar input into a target URL.
 * - URL-like input => normalized http(s) URL
 * - Otherwise => search-engine query URL
 */
export const resolveSafariAddressInput = (input: string): string | null => {
	const value = input.trim();
	if (!value) return null;

	if (URL_INPUT_PATTERN.test(value)) {
		try {
			const parsed = new URL(withDefaultProtocol(value));
			if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
				return parsed.toString();
			}
		} catch {
			// Fall through to search query handling.
		}
	}

	return `${SEARCH_ENGINE_URL}${encodeURIComponent(value)}`;
};

