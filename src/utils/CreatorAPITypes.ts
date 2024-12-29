export type CreatorProfile = {
    username: string,
    platform_username: string,
    full_name: string,
    profile_url: string,
    description: string,
    picture: string,
    date_of_birth: string|null,
    platform_account_type: string|null,
    category: string|null,
    followers: number,
    following: number
    posts: number,
    gender: string|null,
    country: string|null,
    is_verified: boolean,
    website: string
    id?: string
}

export type Post = {
    id: string,
    updated_at: string,
    title: string,
    format: string,
    type: string,
    post_url: string,
    media_url: string,
    description: string,
    visibility: string,
    thumbnail: string | null,
    published_at: string,
    mentions: string[] | null
    likes: number,
    comments: number,
    reach_organic_count: number,
    saves: number,
    views: number | null,
    replays: number | null,
    shares: number
}