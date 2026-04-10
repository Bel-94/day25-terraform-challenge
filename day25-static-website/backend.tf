terraform {
  backend "s3" {
    bucket         = "belinda-terraform-state-30daychallenge"
    key            = "day25/static-website/dev/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-state-locks"
    encrypt        = true
  }
}
