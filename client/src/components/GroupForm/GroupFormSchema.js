import * as yup from "yup";

export const GroupFormSchema = yup.object().shape({
	groupName: yup.string().min(5).required("Group Name Required"),
	description: yup.string(),
	price: yup.number().required("Price Required").positive(),
});
