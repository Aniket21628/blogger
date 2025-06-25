import { useEffect, useState } from "react";
import { useRandomQuote, Quote as QuoteType } from "../hooks";

export default function Quote() {
	const [quote, setQuote] = useState<QuoteType>();

	useEffect(() => {
		const selected = useRandomQuote();
		setQuote(selected);
	}, []);

	return (
		<div className="flex items-center justify-center h-screen text-3xl font-extrabold bg-slate-200">
			<div className="w-3/4 text-center">
				{quote ? (
					<>
						<div>"{quote.text}"</div>
						<div className="mt-4 text-2xl font-semibold text-gray-700">
							— {quote.author}
						</div>
					</>
				) : (
					<div>Loading...</div>
				)}
			</div>
		</div>
	);
}
