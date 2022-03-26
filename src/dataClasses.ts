export interface Image {
    "#text": string;
    size: string;
}

export interface Artist {
    name: string;
    mbid: string;
    url: string;
    image: Image[];
}

export interface Artistmatches {
    artist: Artist[];
}

export interface Results {
    artistmatches: Artistmatches;
}

export interface ApiResult {
    results: Results;
}