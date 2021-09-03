import { mondayClient } from "../client/monday";

const monday = mondayClient();

type NotifiactionMutationResponse = {
  data: NotifiactionProps;
  errors: { message: string; locations: unknown[] }[];
  account_id: number;
};

type NotifiactionProps = {
  create_notification: { text: string };
};

export async function sendNotification(
  userId: string,
  targetId: string,
  text: string
): Promise<NotifiactionProps | undefined> {
  const res: NotifiactionMutationResponse = await monday.api(
    `mutation {
      create_notification (user_id: ${userId}, target_id: ${Number.parseInt(
      targetId
    )}, text: "${text}", target_type: Project) {
          text
      }
    }`
  );

  if (res?.errors) {
    console.log(res.errors);
  }

  if (res?.data) {
    return res.data;
  }

  return undefined;
}
