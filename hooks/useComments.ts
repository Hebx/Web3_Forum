import { useQuery } from "react-query";
import useCommentsContract from "./useCommentsContract";

interface useCommentsQuery {
	topic: string;
}

//fetch comments for a given topic when rendered and also will refetch comments whenever the topic or the chainId change.

const useComments = ({ topic }: useCommentsQuery) => {
	const contract = useCommentsContract();
	// The query key is serialized by react-query and used to maintain a global cache of fetched data.
	return useQuery(["comments", { topic, chainId: contract.chainId }], () =>
		contract.getComments(topic));
};

export default useComments;
