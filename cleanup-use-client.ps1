$files = Get-ChildItem -Path src -Include '*.tsx', '*.ts' -Recurse

$count = 0
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    if ($content -match '^["\s]*use client') {
        $newContent = $content -replace '^\s*use client[\s;]*', ''
        Set-Content -Path $file.FullName -Value $newContent
        $count++
    }
}

Write-Host "Done! Cleaned $count files."
