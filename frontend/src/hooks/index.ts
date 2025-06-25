import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blog {
	author: {
		name: string;
	};
	title: string;
	content: string;
	id: string;
	postedOn: string;
	published: boolean;
	authorId: string;
}

export const useBlog = ({ id }: { id: string }) => {
	const [loading, setLoading] = useState(true);
	const [blog, setBlog] = useState<Blog>();

	useEffect(() => {
		axios
			.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			})
			.then((response) => {
				setBlog(response.data.blog);
				setLoading(false);
			});
	}, [id]);

	return {
		loading,
		blog,
	};
};
export const useBlogs = () => {
	const [loading, setLoading] = useState(true);
	const [blogs, setBlogs] = useState<Blog[]>([]);

	useEffect(() => {
		axios
			.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			})
			.then((response) => {
				setBlogs(response.data.blogs);
				setLoading(false);
			});
	}, []);

	return {
		loading,
		blogs,
	};
};

export interface User {
	id: string;
	name: string;
	email: string;
	posts: Blog[];
}

export function useUserData(id: string) {
	const [loading, setLoading] = useState(true);
	const [userData, setuserData] = useState<User>();

	useEffect(() => {
		axios
			.get(`${BACKEND_URL}/api/v1/user/${id}`, {
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			})
			.then((response) => {
				setuserData(response.data.user);
				setLoading(false);
			});
	}, []);

	return {
		loading,
		userData,
	};
}

export function useUserBoth() {
	const [loading, setLoading] = useState(true);
	const [userData, setuserData] = useState<User>();

	useEffect(() => {
		axios
			.get(`${BACKEND_URL}/api/v1/blog/both`, {
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			})
			.then((response) => {
				setuserData(response.data.user);
				setLoading(false);
			});
	}, []);

	return {
		loading,
		userData,
	};
}

export function useUserDetails(token: any): any {
	var base64Url = token.split(".")[1];
	var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
	var jsonPayload = decodeURIComponent(
		window
			.atob(base64)
			.split("")
			.map(function (c) {
				return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join("")
	);

	return JSON.parse(jsonPayload);
}

export interface Quote {
	text: string;
	author: string;
}

const quotes: Quote[] = [
	{
		text: "The only way to do great work is to love what you do.",
		author: "Steve Jobs",
	},
	{
		text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
		author: "Winston Churchill",
	},
	{
		text: "Believe you can and you're halfway there.",
		author: "Theodore Roosevelt",
	},
	{
		text: "It always seems impossible until it’s done.",
		author: "Nelson Mandela",
	},
	{
		text: "Happiness is not something ready made. It comes from your own actions.",
		author: "Dalai Lama",
	},
	{
		text: "If you want to lift yourself up, lift up someone else.",
		author: "Booker T. Washington",
	},
	{
		text: "Don't watch the clock; do what it does. Keep going.",
		author: "Sam Levenson",
	},
	{
		text: "Do not wait to strike till the iron is hot, but make it hot by striking.",
		author: "William Butler Yeats",
	},
	{
		text: "Strive not to be a success, but rather to be of value.",
		author: "Albert Einstein",
	},
	{
		text: "Dream big and dare to fail.",
		author: "Norman Vaughan",
	},
];

export function useRandomQuote(): Quote {
	const randomIndex = Math.floor(Math.random() * quotes.length);
	return quotes[randomIndex];
}