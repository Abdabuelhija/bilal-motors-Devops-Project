{{- define "backend-chart.name" -}}
{{ .Chart.Name }}
{{- end -}}

{{- define "backend-chart.fullname" -}}
{{- if .Values.fullnameOverride -}}
{{ .Values.fullnameOverride }}
{{- else -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- if contains .Release.Name $name -}}
{{ .Release.Name }}
{{- else -}}
{{ printf "%s-%s" .Release.Name $name }}
{{- end -}}
{{- end -}}
{{- end -}}

{{- define "backend-chart.labels" -}}
app.kubernetes.io/name: {{ include "backend-chart.name" . }}
helm.sh/chart: {{ .Chart.Name }}-{{ .Chart.Version | replace "+" "_" }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}
