const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export class HttpService {
  constructor(private readonly token: string) {
    this.token = token;
  }
 
  async getStatus() {
    const response = await fetch(`${BASE_URL}/tax-calculations/status`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Status request failed: ${response.statusText}`);
    }
    return response.json();
  }

  async exclusaoPisCofins(data: FormData) {
    const response = await fetch(`${BASE_URL}/tax-calculations/exclusao-pis-cofins`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'multipart/form-data`,',
      },
      body: data,
    });

    if (!response.ok) {
      throw new Error(`Status request failed: ${response.statusText}`);
    }
    return response.json();
  }
}
