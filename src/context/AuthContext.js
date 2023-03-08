import PropTypes from 'prop-types'
import React, { createContext, useEffect, useState } from 'react'
import axios from '../utils/axiosInstance'

export const AuthContext = createContext({
    user: null,
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    logout: () => { }
})

AuthProvider.propTypes = {
    children: PropTypes.node
}

function AuthProvider({ children }) {
    const [user, setUser] = useState(null)

    const getUser = () => axios.get('/api/v1/users/user').then((res) => {
        setUser(res.data)
    }).catch((e) => {
        console.log(e)
    })

    useEffect(() => {
        getUser()
    }, [])

    const register = (values) =>
        axios.post("/api/v1/auth/register", values).then((async res => {
            localStorage.setItem('accessToken', res.data.accessToken)
            localStorage.setItem('refreshToken', res.data.refreshToken)
            await getUser()
            return res.data
        })).catch((e) => {
            throw new Error(e.response.data.message)
        })

    const login = async (values) =>
        axios.post("/api/v1/auth/login", values).then((async res => {
            localStorage.setItem('accessToken', res.data.accessToken)
            localStorage.setItem('refreshToken', res.data.refreshToken)
            await getUser()
            return res.data
        })).catch((e) => {
            throw new Error(e.response.data.message)
        })

    const logout = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        setUser(null)
    }
    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>{children}</AuthContext.Provider>
    )
}

export default AuthProvider