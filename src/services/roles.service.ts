import { Roles } from "../model/roles"
import { authStorage } from "./auth.storage"

class RolesService {

    private readonly url = 'http://192.168.0.109:3030/roles'

    private async getHeaders() {
        const logged = await authStorage.getLoggedUser()
        const token = logged && logged.token ? logged.token : null

        if (!token) throw new Error('Token is null')

        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    public async list() {
        const response = await fetch(this.url, {
            method: 'GET',
            headers: await this.getHeaders()
        })

        const data = await response.json()

        if (response.status === 200) {
            return data
        
        } else if (response.status === 401) {
            throw new Error(data.message)
        }
    }

    public async create(roles: Roles) {
        const response = await fetch(this.url, {
            method: 'POST',
            headers: await this.getHeaders(),
            body: JSON.stringify(roles)
        })

        const data = await response.json()

        if (response.status === 201) {
            return data
        
        } else if (response.status === 401) {
            throw new Error(data.message)
        }
    }

    public async update(id: number, roles: Roles) {
        const response = await fetch(`${this.url}/${id}`, {
            method: 'PUT',
            headers: await this.getHeaders(),
            body: JSON.stringify(roles)
        })

        const data = await response.json()

        if (response.status === 200) {
            return data
        
        } else if (response.status === 401) {
            throw new Error(data.message)
        }
    }

}

export const rolesService = new RolesService()