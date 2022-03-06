import { useMutation } from "react-query";
import useCommentsContract from "./useCommentsContract";

interface useAddCommentPayload {
	topic: string;
	message: string;
}

// Mutations are intended for async actions that mutate data such as inserts, updates, and deletes whereas queries are intended for read-only async actions.
const useAddComment = () => {
	const contract = useCommentsContract();
	return useMutation(async ({ topic, message }: useAddCommentPayload) => {
		await contract.addComment(topic, message);
	});
};

export default useAddComment;


