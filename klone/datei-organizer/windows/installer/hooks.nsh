; „Öffnen mit → Datei-Organizer Pro“ für die Dateiarten, die der Organizer liest – nur für diesen Benutzer. Ändert keine Standard-Zuordnung.
; Die Datei wird beim Öffnen KOPIERT (windows/engine/src/DesktopEingang.java); das Original bleibt, wo es ist.
!macro DO_ART EXT
  WriteRegStr HKCU "Software\Classes\Applications\datei-organizer-pro.exe\SupportedTypes" "${EXT}" ""
!macroend
!macro NSIS_HOOK_POSTINSTALL
  WriteRegStr HKCU "Software\Classes\Applications\datei-organizer-pro.exe" "FriendlyAppName" "Datei-Organizer Pro"
  WriteRegStr HKCU "Software\Classes\Applications\datei-organizer-pro.exe\shell\open\command" "" '$\"$INSTDIR\datei-organizer-pro.exe$\" $\"%1$\"'
  WriteRegStr HKCU "Software\Classes\Applications\datei-organizer-pro.exe\DefaultIcon" "" '$\"$INSTDIR\datei-organizer-pro.exe$\",0'
  !insertmacro DO_ART ".pdf"
  !insertmacro DO_ART ".jpg"
  !insertmacro DO_ART ".jpeg"
  !insertmacro DO_ART ".png"
  !insertmacro DO_ART ".tif"
  !insertmacro DO_ART ".tiff"
  !insertmacro DO_ART ".eml"
  !insertmacro DO_ART ".txt"
  !insertmacro DO_ART ".docx"
  !insertmacro DO_ART ".xlsx"
  !insertmacro DO_ART ".pptx"
  !insertmacro DO_ART ".odt"
!macroend

!macro NSIS_HOOK_POSTUNINSTALL
  DeleteRegKey HKCU "Software\Classes\Applications\datei-organizer-pro.exe"
!macroend
