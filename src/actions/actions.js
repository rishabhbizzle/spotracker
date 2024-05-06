'use server'

import { connect } from "@/dgConfig/dbConfig";
import Updates from "@/models/updatesModel";
import { currentUser } from '@clerk/nextjs';
import axios from "axios";
import { revalidatePath } from "next/cache";

export const getAllBlogsFromDb = async (count) => {
    try {
        await connect()
        const blogs = count ? await Updates.find({}).limit(count).sort({ createdAt: -1 }): await Updates.find({}).sort({ createdAt: -1 })

        // convert the blogs to json
        const data = JSON.parse(JSON.stringify(blogs))
        return data


    } catch (error) {
        console.log(error)
        return null
    }
}

export const getBlogPostFromDb = async (slug) => {
    try {
        await connect()
        if (!slug) {
            return null
        }
        const blog = await Updates.findOne({ slug: slug })
        return blog
    } catch (error) {
        console.log(error)
        return null
    }
}


export const createBlogPostInDb = async (blog) => {
    try {
        const user = await currentUser();
        console.log(user, user?.firstName, user?.id )
        if (!user) {
            return { data: null, error: 'User not found' }
        }

        // blog is of formdata type so get the values from it
        const title = blog.get('title')
        const content = blog.get('content')
        const image = blog.get('image')
        const status = blog.get('status') || 'draft'
        const pin = blog.get('pin') || false
        await connect()
        const data = {
            title,
            content,
            image,
            status,
            pin,
            slug: title.replace(/\s+/g, '-').toLowerCase(),
            author: user?.firstName || 'Admin'
        }
        const newBlog = Updates.create(data)
        revalidatePath('/admin')
        return { data: 'Blog created', error: null }
    } catch (error) {
        return { data: null, error: error?.message }
    }
}

export const getLastFmTopTracks = async (page = 1, limit = 10) => {
    try {
        const data = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=ecc9b2c8a479d81dec5c6a6baadf3c09&format=json&page=${page}&limit=${limit}`)
        return data?.data?.tracks
    } catch (error) {
        console.error(error);
        return null
    }
}