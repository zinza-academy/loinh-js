import { TOAST_MESSAGES } from "../constant";
import { useToast } from "@/hooks/use-toast";
import { useUploadUserAvatarMutaion } from "./mutations/useUploadUserAvatarMutaion";
import { useAuthStore } from "@/stores/authStore";

export const useUploadUserAvatar = () => {
  const mutation = useUploadUserAvatarMutaion();
  const { toast } = useToast();
  const { user, setUser } = useAuthStore();

  const uploadAvatar = (data: File) => {
    mutation.mutate(
      { data },
      {
        onSuccess: (res) => {
          toast(TOAST_MESSAGES.UPLOAD_USER_AVATAR_SUCCESS);
          if (user) {
            setUser({
              ...user,
              avatarUrl: res.url,
            });
          }
        },
        onError: (error: unknown) => {
          console.error("update user info error:", error);
          toast({
            ...TOAST_MESSAGES.UPLOAD_USER_AVATAR_ERROR,
            description:
              error instanceof Error
                ? error.message
                : "An unexpected error occurred",
          });
        },
      }
    );
  };

  return {
    ...mutation,
    uploadAvatar,
  };
};
