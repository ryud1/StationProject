from marshmallow import Schema, fields, validate

class StationSchema(Schema):
    id = fields.Int(required=True)
    nome = fields.Str(required=True)
    latitude = fields.Float(required=True, validate=validate.Range(min=-90, max=90))
    longitude = fields.Float(required=True, validate=validate.Range(min=-180, max=180))
    carregamento_tipo = fields.Str(required=True)
    poder = fields.Float(required=True, validate=validate.Range(min=0))
    slots = fields.Int(required=True, validate=validate.Range(min=0))
    status = fields.Str(required=True)
    uf = fields.Str(required=True, validate=validate.Length(min=2))