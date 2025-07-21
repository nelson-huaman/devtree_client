import { isAxiosError } from "axios";
import api from "../config/axios";
import type { User, UserHandle } from "../types";

export async function getUSer() {
   try {
      const { data } = await api<User>('/user')
      return data
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error)
      }
   }
}

export async function updateProfile(formData: User) {
   try {
      const { data } = await api.patch<string>('/user', formData)
      return data
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error)
      }
   }
}

export async function uploadImge(file: File) {
   let formData = new FormData()
   formData.append('file', file)
   try {
      const { data: { image }
      }: { data: { image: String } } = await api.post<User>('/user/image', formData)
      return image
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error)
      }
   }
}

export async function getUserByHandle(handle: string) {
   try {

      const { data } = await api<UserHandle>(`/${handle}`)
      return data
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error)
      }
   }
}


export async function searchByHandle(handle: string) {
   try {

      const { data } = await api.post<string>('search', { handle })
      return data
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error)
      }
   }
}