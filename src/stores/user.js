import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      isAuthenticated: false,
      id: null,
      name: null,
      email: null,
      age: null,
      employment_years: null,
      role: null,
      access: null,
      refresh: null
    }
  }),

  actions: {
    // Initialize store from localStorage
    initStore() {
      const access = localStorage.getItem('user.access')
      if (access) {
        this.user.access = access
        this.user.id = localStorage.getItem('user.id')
        this.user.name = localStorage.getItem('user.name')
        this.user.email = localStorage.getItem('user.email')
        this.user.employment_years = localStorage.getItem('user.employment_years')
        this.user.age = localStorage.getItem('user.age')
        this.user.role = localStorage.getItem('user.role')
        this.user.isAuthenticated = true
      }
    },

    // Set token and save to localStorage
    setToken(data) {
      console.log('setToken', data.token)

      this.user.access = data.token
      this.user.isAuthenticated = true

      localStorage.setItem('user.access', data.token)
    },

    // Remove tokens and user info
    removeToken() {
      console.log('removeToken')

      this.user = {
        isAuthenticated: false,
        id: null,
        name: null,
        email: null,
        age: null,
        employment_years: null,
        role: null,
        access: null,
      }

      localStorage.removeItem('user.access')
      localStorage.removeItem('user.id')
      localStorage.removeItem('user.name')
      localStorage.removeItem('user.email')
      localStorage.removeItem('user.age')
      localStorage.removeItem('user.employment_years')
      localStorage.removeItem('user.role')
    },

    // Set user info and store it
    setUserInfo(user) {
      console.log('setUserInfo', user)

      this.user.id = user.id
      this.user.name = user.name
      this.user.email = user.email
      this.user.age = user.age
      this.user.employment_years = user.employment_years
      this.user.role = user.role

      localStorage.setItem('user.id', user.id)
      localStorage.setItem('user.name', user.name)
      localStorage.setItem('user.email', user.email)
      localStorage.setItem('user.age', user.age)
      localStorage.setItem('user.employment_years', user.employment_years)
      localStorage.setItem('user.role', user.role)
    }
  }
})