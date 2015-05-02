for install npm module globaly and find them from NodeJS
add to SYSTEM variable  key with the name NODE_PATH and set it to `%AppData%\npm\node_modules`
or wherever npm ends up installing the modules on your Windows flavor. To be done with it once and for
all, add this as a System variable in the Advanced tab of the System Properties dialog
(run control.exe sysdm.cpl,System,3).
