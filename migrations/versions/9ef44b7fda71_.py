"""empty message

Revision ID: 9ef44b7fda71
Revises: f19a737b0722
Create Date: 2023-08-25 03:34:43.871464

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9ef44b7fda71'
down_revision = 'f19a737b0722'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('court',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('sport', sa.String(length=120), nullable=False),
    sa.Column('sport_center_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['sport_center_id'], ['sport_center.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('center_schedule')
    with op.batch_alter_table('sport_center', schema=None) as batch_op:
        batch_op.drop_column('sport')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('sport_center', schema=None) as batch_op:
        batch_op.add_column(sa.Column('sport', sa.VARCHAR(length=120), autoincrement=False, nullable=False))

    op.create_table('center_schedule',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('hour_block', sa.VARCHAR(length=120), autoincrement=False, nullable=False),
    sa.Column('sport_center_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['sport_center_id'], ['sport_center.id'], name='center_schedule_sport_center_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='center_schedule_pkey')
    )
    op.drop_table('court')
    # ### end Alembic commands ###
