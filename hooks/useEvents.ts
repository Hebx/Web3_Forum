import { useEffect } from "react";
import { useQueryClient } from "react-query";
import useCommentsContract, { EventType } from "./useCommentsContract";

interface UseEventsQuery {
	topic: string;
}

// Listen to Events and refresh Data
// This hook subscribes to the contract's CommentsAdded event and tells react-query to mark our useComments query as stale, causing it to refetch the list of comments.

const useEvents = ({ topic }: UseEventsQuery) => {
	const queryClient = useQueryClient();
	const commentsContract = useCommentsContract();

	useEffect(() => {
		const handler = (comment) => {
			if (comment.topic !== topic) {
				return;
			}
		// Invalidates the query whose query key matches the passed array.
      // This will cause the useComments hook to re-render the Comments
      // component with fresh data.
	  queryClient.invalidateQueries([
		  "comments",
		  { topic: comment.topic, chainId: commentsContract.chainId },
	  ]);
	};
	commentsContract.contract.on(EventType.CommentAdded, handler);
	return () => {
		commentsContract.contract.off(EventType.CommentAdded, handler);
		};
	}, [queryClient, commentsContract.chainId, topic]);
};

export default useEvents;

