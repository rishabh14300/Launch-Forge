export interface Feature {
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface DbColumn {
  name: string;
  type: string;
  constraints: string;
}

export interface DbTable {
  name: string;
  columns: DbColumn[];
}

export interface DatabaseSchema {
  type: string;
  description: string;
  tables: DbTable[];
}

export interface ApiEndpoint {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  description: string;
  authRequired: boolean;
  requestBody?: string;
  responseBody?: string;
}

export interface ComponentItem {
  name: string;
  type: string;
  purpose: string;
}

export interface FrontendArchitecture {
  framework: string;
  stateManagement: string;
  cssFramework: string;
  componentTree: ComponentItem[];
}

export interface BackendArchitecture {
  framework: string;
  coreLibraries: string[];
  structureDescription: string;
}

export interface RoadmapPhase {
  phaseName: string;
  duration: string;
  objectives: string[];
}

export interface TechStackJustification {
  toolName: string;
  role: string;
  whySelected: string;
}

export interface Blueprint {
  id: string;
  projectName: string;
  tagline: string;
  concept: string;
  createdAt: string;
  preferredStack: {
    frontend: string;
    backend: string;
    database: string;
    hosting: string;
  };
  strategy: {
    targetAudience: string[];
    coreFeatures: Feature[];
    mvpScope: string;
  };
  databaseSchema: DatabaseSchema;
  apiEndpoints: ApiEndpoint[];
  frontendArchitecture: FrontendArchitecture;
  backendArchitecture: BackendArchitecture;
  roadmap: RoadmapPhase[];
  techStackJustification: TechStackJustification[];
}
