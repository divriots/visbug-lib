import $$ from 'blingblingjs/src/index.js'

export default function $(query, $context = document) {
  return query.nodeType !== undefined ? $$([query]) : $$(query) 
}
