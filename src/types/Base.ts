export interface CutoffType {
  college_code: string
  cutoff: string
  branch: string
  category: string
  college_name: string
  year: string
}

export type BranchOptionType = {
  branch_name: string
  branch_short_name: string
}

export type Inputs = {
  min_cutoff: string
  max_cutoff: string

  category: string[]
  year: string[]
  round: string
  branch: BranchOptionType[]
}

export interface CutoffArgs {
  min_cutoff: string
  max_cutoff: string
  branch: string
  round: string
  year: string
  category: string
}

export type LoginInputs = {
  email: string
  password: string
}

export type SignUpInputs = {
  username: string
  email: string
  password: string
}
