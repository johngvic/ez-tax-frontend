import { ExclusaoPisCofinsJob } from "@/types/TaxCalculations";

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

  async getExclusaoPisCofinsJobs(): Promise<ExclusaoPisCofinsJob[]> {
    const response = await fetch(`${BASE_URL}/tax-calculations/exclusao-pis-cofins`, {
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

  async postExclusaoPisCofinsJob(data: FormData) {
    const response = await fetch(`${BASE_URL}/tax-calculations/exclusao-pis-cofins`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`
      },
      body: data
    });

    if (!response.ok) {
      throw new Error(`Status request failed: ${response.statusText}`);
    }

    return response.json();
  }

  async downloadExclusaoPisCofinsJob(calculationId: string) {
    const response = await fetch(`${BASE_URL}/tax-calculations/exclusao-pis-cofins/${calculationId}/download`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Download request failed: ${response.statusText}`);
    }

    const { url } = await response.json();
    
    const fileResponse = await fetch(url);
    if (!fileResponse.ok) {
      throw new Error(`File download failed: ${fileResponse.statusText}`);
    }

    return fileResponse.blob();
  }
}