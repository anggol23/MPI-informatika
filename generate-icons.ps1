Add-Type -AssemblyName System.Drawing

function Generate-PwaIcon {
    param(
        [int]$size,
        [string]$outPath
    )
    $bmp = New-Object System.Drawing.Bitmap($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    
    # Background brush (Cyan-blue gradient)
    $rect = New-Object System.Drawing.Rectangle(0, 0, $size, $size)
    $color1 = [System.Drawing.ColorTranslator]::FromHtml('#0284c7')
    $color2 = [System.Drawing.ColorTranslator]::FromHtml('#06b6d4')
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, $color1, $color2, 45.0)
    $g.FillRectangle($brush, $rect)
    
    # Inner rounded white container
    $pad = [int]($size * 0.08)
    $innerSize = $size - ($pad * 2)
    $whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(240, 255, 255, 255))
    $g.FillEllipse($whiteBrush, $pad, $pad, $innerSize, $innerSize)
    
    # Load and draw logo in center
    $logoPath = "public/images/logo_smp1kutasari.png"
    if (Test-Path $logoPath) {
        $fullPath = (Resolve-Path $logoPath).Path
        $logo = [System.Drawing.Image]::FromFile($fullPath)
        $logoPad = [int]($size * 0.20)
        $logoSize = $size - ($logoPad * 2)
        $g.DrawImage($logo, $logoPad, $logoPad, $logoSize, $logoSize)
        $logo.Dispose()
    }
    
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    $brush.Dispose()
    $whiteBrush.Dispose()
}

Generate-PwaIcon -size 192 -outPath "public/icons/icon-192.png"
Generate-PwaIcon -size 512 -outPath "public/icons/icon-512.png"
Generate-PwaIcon -size 512 -outPath "public/icons/icon-maskable-512.png"
Write-Output "PWA Icons Generated Successfully"

