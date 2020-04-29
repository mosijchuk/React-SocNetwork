import axios from "axios";
import {ResultCodesEnum, ResultCodeWithCaptchaEnum, UserType} from "../types/types";

const API_KEY = "6b0b3871-82c7-4380-a557-76c80e25c284";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": API_KEY
    }
});

export type GetUsersResponse = {
    items: Array<UserType>
    totalCount: number
    error: string
}
type DefaultResType = {
    resultCode: ResultCodesEnum
    messages: Array<string>,
    data: {}
}
export const UsersAPI = {
    getUsers(count: number = 1, page: number = 1) {
        return instance.get<GetUsersResponse>(`users?count=${count}&page=${page}`).then(response => {
            return response.data;
        });
    },

    getFollowUser(userId: number = 1) {
        return instance.get<boolean>(`follow/${userId}`).then(response => {
            return response.data;
        });
    },

    followUser(userId: number = 1) {
        return instance.post<DefaultResType>(`follow/${userId}`).then(response => {
            return response.data;
        });
    },
    unfollowUser(userId: number = 1) {
        return instance.delete<DefaultResType>(`follow/${userId}`).then(response => {
            return response.data;
        });
    }
};

type ProfileInfoResType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }

}
export const ProfileAPI = {
    getProfileInfo(userId: number = 1) {
        return instance.get<ProfileInfoResType>(`profile/${userId}`).then(response => {
            return response.data;
        });
    },
    getProfileStatus(userId: number = 1) {
        return instance.get<string>(`profile/status/${userId}`).then(response => {
            return response.data;
        });
    },
    updateProfileStatus(status: string) {
        return instance
            .put<DefaultResType>(`profile/status`, {
                status: status
            })
            .then((response: any): any => {
                if (response.data.resultCode === 0) {
                    return status;
                }
            });
    },
    updateProfileData(formData: any) {
        return instance.put(`profile`, formData).then(response => {
            return response.data;
        });
    },
    updateProfileAvatar(formData: any) {
        return instance
            .post(`profile/photo`, formData, {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            })
            .then(response => {
                return response.data;
            });
    }
};

export type AuthMeResType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LoginResType = {
    resultCode: ResultCodesEnum | ResultCodeWithCaptchaEnum
    messages: Array<string>
    data: {
        userId: number
    }
}
type LogoutResType = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: {}
}
export const AuthAPI = {
    authMe(): any {
        return instance.get<AuthMeResType>(`auth/me`).then(response => {
            return response.data;
        });
    },
    login(email: string, password: string, rememberMe: boolean, captcha: null | string = null) {
        return instance
            .post<LoginResType>(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => {
                return response.data;
            });
    },
    logout() {
        return instance.delete<LogoutResType>(`auth/login`).then(response => {
            return response.data;
        });
    }
};

type SecurityResType = {
    url: string
}
export const SecurityAPI = {
    getCaptcha() {
        return instance.get<SecurityResType>(`security/get-captcha-url`).then(res => {
            return res.data.url
        });
    }
};


export const DialogsAPI = {
    getDialogs() {
        return instance.get(`dialogs`).then(res => {
            return res.data
        });
    },
    createDialog(userId: number) {
        return instance.put(`dialogs/${userId}`).then(res => {
            return res.data
        });
    },
    getMessages(userId: number) {
        return instance.get(`dialogs/${userId}/messages`);
    },
    sendMessage(userId: number, messageBody: string) {
        return instance.post(`dialogs/${userId}/messages`, {body: messageBody});
    },
    deleteMessage(messageId: string) {
        return instance.delete(`dialogs/messages/${messageId}`);
    },
    checkNewMessages() {
        return instance.get(`dialogs/messages/new/count`);
    }
};
