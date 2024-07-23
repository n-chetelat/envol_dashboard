export const verifyToken = async (
  token: string,
  profileType: string,
  email: string,
) => {
  let result;
  if (profileType === "business") {
    result = await verifyBusinessToken(token, email);
  } else if (profileType === "instructor") {
    result = await verifyInstructorToken(token, email);
  } else {
    throw new Error(`Invalid Token Type ${profileType}`);
  }
  return result;
};

export const verifyBusinessToken = async (token: string, email: string) => {
  return await fetch(`/api/business_tokens/verify`, {
    method: "POST",
    body: JSON.stringify({ token, email }),
  });
};

export const verifyInstructorToken = async (token: string, email: string) => {
  return await fetch(`/api/instructor_tokens/verify`, {
    method: "POST",
    body: JSON.stringify({ token, email }),
  });
};
