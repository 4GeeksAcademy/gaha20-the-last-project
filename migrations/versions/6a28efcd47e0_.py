"""empty message

Revision ID: 6a28efcd47e0
Revises: ec6d18627168
Create Date: 2023-08-22 17:32:45.059566

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6a28efcd47e0'
down_revision = 'ec6d18627168'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('sport_center',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('address', sa.String(length=800), nullable=False),
    sa.Column('phone_number', sa.String(length=24), nullable=False),
    sa.Column('sport', sa.String(length=120), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('center_schedule',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('center_id', sa.Integer(), nullable=True),
    sa.Column('hour_block', sa.String(length=120), nullable=False),
    sa.ForeignKeyConstraint(['center_id'], ['sport_center.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('center_schedule')
    op.drop_table('sport_center')
    # ### end Alembic commands ###
