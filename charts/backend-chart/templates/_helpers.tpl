{{- /* Canonical helpers for this chart */ -}}
{{- define "backend-chart.name" -}}{{ .Chart.Name }}{{- end -}}

{{- define "backend-chart.fullname" -}}
{{- if .Values.fullnameOverride -}}{{ .Values.fullnameOverride }}
{{- else -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- if contains .Release.Name $name -}}{{ .Release.Name }}
{{- else -}}{{ printf "%s-%s" .Release.Name $name }}{{- end -}}
{{- end -}}
{{- end -}}

{{- define "backend-chart.labels" -}}
app.kubernetes.io/name: {{ include "backend-chart.name" . }}
helm.sh/chart: {{ .Chart.Name }}-{{ .Chart.Version | replace "+" "_" }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}

{{/* -------- Backward-compat aliases -------- */}}

{{- /* Old repo prefix */ -}}
{{- define "bilal-motors.fullname" -}}{{ include "backend-chart.fullname" . }}{{- end -}}
{{- define "bilal-motors.name" -}}{{ include "backend-chart.name" . }}{{- end -}}
{{- define "bilal-motors.labels" -}}{{ include "backend-chart.labels" . }}{{- end -}}

{{- /* Files use "backend.*" */ -}}
{{- define "backend.fullname" -}}{{ include "backend-chart.fullname" . }}{{- end -}}
{{- define "backend.name" -}}{{ include "backend-chart.name" . }}{{- end -}}
{{- define "backend.labels" -}}{{ include "backend-chart.labels" . }}{{- end -}}

{{- /* Secret uses "app.*" */ -}}
{{- define "app.fullname" -}}{{ include "backend-chart.fullname" . }}{{- end -}}
{{- define "app.name" -}}{{ include "backend-chart.name" . }}{{- end -}}
{{- define "app.labels" -}}{{ include "backend-chart.labels" . }}{{- end -}}
