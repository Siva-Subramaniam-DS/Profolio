# Simple Portfolio Deployment Script - Deploy built files to main branch
Write-Host "Starting portfolio deployment..." -ForegroundColor Green

# Step 1: Switch to main branch
Write-Host "Switching to main branch..." -ForegroundColor Yellow
git checkout main

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to switch to main branch!" -ForegroundColor Red
    exit 1
}

# Step 2: Copy built files from dist to root
Write-Host "Copying built files to root..." -ForegroundColor Yellow
if (Test-Path "dist") {
    # Remove old files first (except dist folder and git files)
    Get-ChildItem -Path "." -Exclude "dist", ".git*", "node_modules" | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
    
    # Copy new built files
    Copy-Item -Path "dist\*" -Destination "." -Recurse -Force
    
    Write-Host "Files copied successfully!" -ForegroundColor Green
} else {
    Write-Host "dist folder not found! Make sure build completed successfully." -ForegroundColor Red
    exit 1
}

# Step 3: Add and commit changes
Write-Host "Committing changes..." -ForegroundColor Yellow
git add .
git commit -m "Deploy: Updated portfolio $(Get-Date -Format 'yyyy-MM-dd HH:mm')"

# Step 4: Push to GitHub
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "Deployment successful!" -ForegroundColor Green
    Write-Host "Your portfolio is now live!" -ForegroundColor Cyan
    Write-Host "Repository: https://github.com/Siva-Subramaniam-DS/Live-Portfolio.git" -ForegroundColor Blue
} else {
    Write-Host "Push failed!" -ForegroundColor Red
}

Write-Host "Deployment process completed!" -ForegroundColor Green 