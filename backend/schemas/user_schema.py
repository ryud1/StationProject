from marshmallow import Schema, fields, validate

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    email = fields.Email(required=True, validate=validate.Length(max=150))
    password = fields.Str(required=True, load_only=True, validate=validate.Length(min=6))
