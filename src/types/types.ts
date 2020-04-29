export type PostType = {
    id: number,
    name: string,
    date: string,
    message: string,
    likes: number
}
export type ContactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType,
    isFollowed: boolean
}

export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}
export type UsersType = {
    items: Array<UserType>
    totalCount: number
    error: string
}

export type ProfileInfoProps = {
    myId: number | null
    profile: ProfileType | null
    loading: boolean
    isOwner: boolean
    isFollowed: boolean
    updateProfileAvatar: (formData: {}, myId: number) => void
    unfollowProfile: (userId: number) => void
    followProfile: (userId: number) => void
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeWithCaptchaEnum {
    CaptchaIsRequired = 10
}

export type DialogType = any


