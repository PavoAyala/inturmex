
const DATA_CONNECT_URL = "https://us-east4-inturmex-c511a.firebasedataconnect.googleapis.com/v1alpha/projects/inturmex-c511a/locations/us-east4/services/inturmex-c511a-service/connectors/default:execute";

export async function executeOperation(operationName: string, variables: any = {}) {
  try {
    const response = await fetch(DATA_CONNECT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-cloud-project': 'inturmex-c511a'
      },
      body: JSON.stringify({
        operationName,
        variables
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Data Connect Error (${response.status}): ${errorText}`);
    }

    const result = await response.json();
    if (result.errors) {
      throw new Error(`GraphQL Error: ${JSON.stringify(result.errors)}`);
    }

    return result.data;
  } catch (error) {
    console.error(`Failed to execute ${operationName}:`, error);
    throw error;
  }
}
