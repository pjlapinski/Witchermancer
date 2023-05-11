import axios from 'axios'
import { Character } from '@/domain/types/character'

export const isUserAuthenticated = (): Promise<boolean> =>
  axios.get('api/auth').then(r => r.data)

export const getCharacter = (id: string): Promise<Character | null> =>
  axios.get(`api/char/${id}`).then(r => r.status === 200 ? r.data : null)

export const getUserCharacters = (): Promise<Character[]> =>
  axios.get('api/char/list').then(r => r.data)

export const createCharacter = (character: Character): Promise<Character> =>
  axios.post('api/char/new', character).then(r => r.data)

export const updateCharacter = (id: string, character: Character) =>
  axios.post(`api/char/${id}`, character)

export const deleteCharacter = (id: string) =>
  axios.delete(`api/char/${id}`)
