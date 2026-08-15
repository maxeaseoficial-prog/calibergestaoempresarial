
import { MapPin, Users } from "lucide-react";

export interface StateInfo {
  id: string;
  name: string;
  description: string;
}

export const ACTIVE_STATES: StateInfo[] = [
  { id: "MT", name: "Mato Grosso", description: "Soluções implementadas em empresas de diversos setores." },
  { id: "MS", name: "Mato Grosso do Sul", description: "Excelência em gestão aplicada em indústrias e serviços." },
  { id: "PA", name: "Pará", description: "Estruturação de processos em grandes operações regionais." },
  { id: "AC", name: "Acre", description: "Eficiência operacional e controle de gestão de ponta." },
  { id: "AM", name: "Amazonas", description: "Gestão estratégica para o Polo Industrial e comércio." },
  { id: "SP", name: "São Paulo", description: "Consultoria premium para o maior centro econômico do país." },
  { id: "PR", name: "Paraná", description: "Sede administrativa e referência em projetos de expansão." },
  { id: "RO", name: "Rondônia", description: "Transformação da gestão em agronegócio e varejo." },
  { id: "BA", name: "Bahia", description: "Otimização de custos e aumento de rentabilidade." },
  { id: "PI", name: "Piauí", description: "Suporte especializado para crescimento acelerado." },
];

export const ALL_STATE_IDS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

