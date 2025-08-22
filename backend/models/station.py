from database import db

class Station(db.Model):
    __tablename__ = "stations"

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    carregamento_tipo = db.Column(db.String(100), nullable=False)  
    poder = db.Column(db.Float, nullable=False)
    slots = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(100), nullable=False)       
    uf = db.Column(db.String(5), nullable=False)
